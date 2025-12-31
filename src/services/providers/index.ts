// =============================================
// ADAPTATEUR DE PROVIDERS
// =============================================
// Ce fichier sélectionne automatiquement le bon provider
// selon la configuration dans provider.config.ts

import { DATA_PROVIDER } from '@/config/provider.config'

import {
  supabaseProductProvider,
  supabaseCartProvider,
  supabaseOrderProvider,
  supabaseAuthProvider
} from './supabase.provider'

import {
  javaBackendProductProvider,
  javaBackendCartProvider,
  javaBackendOrderProvider,
  javaBackendAuthProvider
} from './java-backend.provider'

import type {
  IProductService,
  ICartService,
  IOrderService,
  IAuthService
} from './types'

// Sélectionner les providers selon la configuration
export const productService: IProductService = 
  DATA_PROVIDER === 'java-backend' 
    ? javaBackendProductProvider 
    : supabaseProductProvider

export const cartService: ICartService = 
  DATA_PROVIDER === 'java-backend' 
    ? javaBackendCartProvider 
    : supabaseCartProvider

export const orderService: IOrderService = 
  DATA_PROVIDER === 'java-backend' 
    ? javaBackendOrderProvider 
    : supabaseOrderProvider

export const authService: IAuthService = 
  DATA_PROVIDER === 'java-backend' 
    ? javaBackendAuthProvider 
    : supabaseAuthProvider

// Exporter le provider actuel pour debugging
export const currentProvider = DATA_PROVIDER

