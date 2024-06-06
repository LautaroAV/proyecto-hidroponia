// supabaseUtils.js
import { supabase } from '../supabase'; 

export async function obtenerUltimoRegistro(tabla, columna) {
  let { data, error } = await supabase
    .from(tabla)
    .select(`${columna}, fecha, hora`) // Utiliza el parámetro 'columna'
    .order("id", { ascending: false })
    .limit(1);

  if (error) {
    console.error(`Error fetching data from ${tabla}:`, error);
    return null;
  }

  if (data && data.length > 0) {
    return data[0]; // Retorna el primer objeto del array
  } else {
    return null;
  }
}

export async function obtenerRegistroMantenimiento() {
  const mantenimiento = 'mantenimiento'; 

  let { data, error } = await supabase
    .from(mantenimiento)
    .select(`tipo_sensor, tipo_mantenimiento, fecha, hora`) // Utiliza el parámetro 'columna'
    .order("id", { ascending: false })
    .limit(1);

  if (error) {
    console.error(`Error fetching data from ${mantenimiento}:`, error);
    return null;
  }

  if (data && data.length > 0) {
    return data[0]; // Retorna el primer objeto del array
  } else {
    return null;
  }
}