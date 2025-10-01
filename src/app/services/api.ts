import { v4 as uuidv4 } from "uuid";

const ODOO_URL = process.env.NEXT_PUBLIC_ODOO_URL || "http://localhost:8069";

interface RpcKwargs {
  [key: string]: unknown;
}

export async function methodCall(
  model: string,
  method: string,
  args: unknown[] = [],
  kwargs: RpcKwargs = {}
) {
  try {
    const response = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: { model, method, args, kwargs },
        id: uuidv4(), 
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error(`❌ RPC Error [${model}.${method}]`, data.error);
      throw new Error(data.error.message || "Odoo RPC Error");
    }

    return data.result;
  } catch (error) {
    console.error(`❌ RPC Error [${model}.${method}]`, error);
    throw error;
  }
}

