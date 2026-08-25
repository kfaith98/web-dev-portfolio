export async function loadSuppliers() {
  try {
    const response = await fetch('./data/suppliers.json');
    
    if (!response.ok) throw new Error("Request failed.");

    const suppliers = await response.json(); 
    return suppliers;
    
  } catch (error) {
    console.error("Problem loading data", error);
  }
}
