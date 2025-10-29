import { supabase } from '../lib/supabase'

export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Test de connexion Supabase...')
    
    // Test simple : récupérer les catégories
    const { data, error } = await supabase
      .from('category')
      .select('*')
      .limit(5)
    
    if (error) {
      console.error('❌ Erreur Supabase:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Connexion Supabase réussie!', data)
    return { success: true, data }
  } catch (err) {
    console.error('❌ Erreur de connexion:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Erreur inconnue' }
  }
}

export const testProducts = async () => {
  try {
    console.log('🔍 Test des produits...')
    
    // Test des produits Mac (catégorie 1)
    const { data, error } = await supabase
      .from('product')
      .select(`
        *,
        category (id, libelle),
        product_color (id, name, hex, code, image),
        product_storage (id, size, price),
        product_feature (id, feature)
      `)
      .eq('categoryid', 1)
      .limit(5)
    
    if (error) {
      console.error('❌ Erreur produits:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Produits récupérés!', data)
    return { success: true, data }
  } catch (err) {
    console.error('❌ Erreur produits:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Erreur inconnue' }
  }
}
