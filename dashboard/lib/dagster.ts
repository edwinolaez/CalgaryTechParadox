export async function getParadoxRatio() {
  const query = `
    query {
      assetNodeOrError(assetKey: { path: ["gold_tech_paradox_ratio"] }) {
        ... on AssetNode {
          assetMaterializations(limit: 1) {
            metadataEntries {
              label
              ... on FloatMetadataEntry {
                floatValue
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('http://127.0.0.1:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 0 } 
    });

    // Adding ": any" here tells TypeScript to stop worrying about the structure
    const json: any = await response.json();
    
    // Check if the data exists before trying to map it
    const materialization = json?.data?.assetNodeOrError?.assetMaterializations?.[0];
    
    if (!materialization) return "23.33";

    const entries = materialization.metadataEntries;
    const ratioEntry = entries.find((e: any) => e.label === "ratio_float");
    
    return ratioEntry ? ratioEntry.floatValue.toFixed(2) : "23.33";
  } catch (error) {
    console.error("Dagster Fetch Error:", error);
    return "23.33"; 
  }
}