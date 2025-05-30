const baseURL = import.meta.env.VITE_BASE_URL;

export async function getInvoices(route = "/invoices", query = "") {
  const req = await fetch(baseURL + route + (query ? `?status=${query}` : ""));
  if (req.status === 200) {
    const result = await req.json();
    return result.data;
  } else {
    throw new Error("Something went wrong");
  }
}
export async function getInvoice(route = "/invoices", id) {
  const req = await fetch(baseURL + route + `/${id}`);
  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Something went wrong");
  }
}

export async function deleteById(id) {
  const req = await fetch(baseURL + `/${id}`, {
    method: "DELETE",
  });
  if (req.status === 200) {
    return "Succes";
  } else {
    throw new Error("Something went wrong");
  }
}

export async function updateById(id, newData) {
  const req = await fetch(baseURL + `/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newData),
  });
  if (req.status === 200) {
    const result = req.json();
    return result;
  } else {
    throw new Error("Something went wrong");
  }
}

export async function addInvoice(data) {
  const req = await fetch(baseURL, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (req.status === 200) {
    const result = req.json();
    return result;
  } else {
    throw new Error("Something went wrong");
  }
}
