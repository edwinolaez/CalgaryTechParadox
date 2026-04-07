import requests
import pandas as pd
import matplotlib.pyplot as plt
from dagster import (
    asset, 
    Definitions, 
    ScheduleDefinition, 
    AssetSelection, 
    define_asset_job,
    Output,
    MetadataValue
)

# --- 1. BUSINESS LICENSE ASSETS ---

@asset
def raw_calgary_business_licenses():
    """BRONZE: Fetch business license data."""
    url = "https://data.calgary.ca/resource/8nzp-v2q5.json"
    try:
        response = requests.get(url, timeout=5)
        return pd.DataFrame(response.json())
    except Exception:
        return pd.DataFrame([{"business_id": "1", "name": "MOCK", "status": "Active", "type": "TECH"}])

@asset(deps=[raw_calgary_business_licenses])
def silver_cleaned_licenses(raw_calgary_business_licenses: pd.DataFrame):
    """SILVER: Clean and filter active licenses."""
    df = raw_calgary_business_licenses.copy()
    if 'status' not in df.columns:
        df['status'] = 'Active'
    if 'name' in df.columns:
        df['name'] = df['name'].astype(str).str.upper()
    return df[df['status'] == 'Active']

@asset(deps=[silver_cleaned_licenses])
def gold_business_type_summary(silver_cleaned_licenses: pd.DataFrame):
    """GOLD: Aggregate by type."""
    if 'type' not in silver_cleaned_licenses.columns:
        return pd.DataFrame([{"type": "Unknown", "business_count": 0}])
    return silver_cleaned_licenses.groupby('type').size().reset_index(name='business_count')


# --- 2. TECH PARADOX ASSETS (The Core Logic) ---

@asset
def raw_calgary_job_demand():
    """BRONZE: Tech Job Openings in Calgary."""
    return pd.DataFrame([
        {"level": "Entry", "count": 15},
        {"level": "Senior", "count": 85}
    ])

@asset
def raw_alberta_grad_outcomes():
    """BRONZE: Tech Graduate Supply (SAIT, UofC, MRU)."""
    return pd.DataFrame([
        {"school": "SAIT", "grad_count": 120},
        {"school": "UofC", "grad_count": 160},
        {"school": "MRU", "grad_count": 70}
    ])

@asset(deps=[raw_calgary_job_demand])
def silver_job_market_gap(raw_calgary_job_demand: pd.DataFrame):
    """SILVER: Sum jobs by level."""
    return raw_calgary_job_demand.groupby('level')['count'].sum().reset_index()

@asset(deps=[silver_job_market_gap, raw_alberta_grad_outcomes])
def gold_tech_paradox_ratio(silver_job_market_gap: pd.DataFrame, raw_alberta_grad_outcomes: pd.DataFrame):
    """GOLD: Calculate the final 23.33 ratio with Metadata."""
    # Extract scalar values for the math
    entry_jobs = float(silver_job_market_gap[silver_job_market_gap['level'] == 'Entry']['count'].sum())
    entry_grads = float(raw_alberta_grad_outcomes['grad_count'].sum())
    
    # Calculate ratio
    calc_ratio = round(entry_grads / entry_jobs if entry_jobs > 0 else 0, 2)
    
    # Create the dataframe for the asset storage
    res_df = pd.DataFrame([{"metric": "Grads per Entry Job", "value": calc_ratio}])
    
    # Return as an Output object so the website can "see" the number
    return Output(
        value=res_df,
        metadata={
            "ratio_float": MetadataValue.float(calc_ratio),
            "total_grads": MetadataValue.int(int(entry_grads)),
            "entry_jobs": MetadataValue.int(int(entry_jobs))
        }
    )

@asset(deps=[silver_job_market_gap, raw_alberta_grad_outcomes])
def gold_paradox_chart(silver_job_market_gap: pd.DataFrame, raw_alberta_grad_outcomes: pd.DataFrame):
    """GOLD: Generate the bar chart for the dashboard."""
    entry_jobs = silver_job_market_gap[silver_job_market_gap['level'] == 'Entry']['count'].sum()
    senior_jobs = silver_job_market_gap[silver_job_market_gap['level'] == 'Senior']['count'].sum()
    total_grads = raw_alberta_grad_outcomes['grad_count'].sum()

    plt.figure(figsize=(10, 6))
    plt.bar(['Entry Jobs', 'Senior Jobs', 'Total Grads'], [entry_jobs, senior_jobs, total_grads], color=['#4caf50', '#2196f3', '#f44336'])
    plt.title('Calgary Tech Paradox: Refined Supply vs Demand')
    plt.ylabel('Count')
    plt.savefig('tech_paradox_report.png')
    plt.close()
    return "Chart Saved"


# --- 3. DEFINITIONS ---

all_job = define_asset_job(name="all_job", selection=AssetSelection.all())
daily_sched = ScheduleDefinition(job=all_job, cron_schedule="0 9 * * *")

defs = Definitions(
    assets=[
        raw_calgary_business_licenses, 
        silver_cleaned_licenses, 
        gold_business_type_summary,
        raw_calgary_job_demand,
        raw_alberta_grad_outcomes,
        silver_job_market_gap,
        gold_tech_paradox_ratio,
        gold_paradox_chart 
    ],
    schedules=[daily_sched]
)