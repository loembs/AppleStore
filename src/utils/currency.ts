type SupportedCurrency = 'EUR' | 'USD' | 'XOF' | 'GHS' | 'NGN'


const RATES_KEY = 'currency_rates'
const CURR_KEY = 'currency_selected'

// Taux indicatifs (démo). En prod: récupérer depuis backend/fournisseur FX.
const DEFAULT_RATES: Record<SupportedCurrency, number> = {
  EUR: 1,
  USD: 1.08,
  XOF: 655.957,
  GHS: 13.0,
  NGN: 1600
}

export function getSelectedCurrency(): SupportedCurrency {
  try {
    const stored = localStorage.getItem(CURR_KEY)
    return (stored as SupportedCurrency) || DEFAULT_CURRENCY
  } catch {
    return DEFAULT_CURRENCY
  }
}

export function setSelectedCurrency(curr: SupportedCurrency) {
  try { localStorage.setItem(CURR_KEY, curr) } catch {}
}

export function getRates(): Record<SupportedCurrency, number> {
  try {
    const stored = localStorage.getItem(RATES_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_RATES
  } catch {
    return DEFAULT_RATES
  }
}

export function setRates(rates: Partial<Record<SupportedCurrency, number>>) {
  const merged = { ...DEFAULT_RATES, ...rates }
  try { localStorage.setItem(RATES_KEY, JSON.stringify(merged)) } catch {}
}

export function convertFromEur(amountEur: number, to: SupportedCurrency): number {
  const rates = getRates()
  return amountEur * (rates[to] || 1)
}

export function convert(amountEur: number, to?: SupportedCurrency): number {
  const target = to || getSelectedCurrency()
  return convertFromEur(amountEur, target)
}

export function formatCurrency(amountEur: number, to?: SupportedCurrency): string {
  const target = to || getSelectedCurrency()
  const value = convertFromEur(amountEur, target)
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: target }).format(value)
}

// Utilitaires pour la gestion des devises
export type Currency = 'XOF' | 'EUR' | 'USD';

export const CURRENCIES = {
  XOF: { code: 'XOF', symbol: 'F CFA', name: 'Franc CFA' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  USD: { code: 'USD', symbol: '$', name: 'Dollar US' }
} as const;

// Devise par défaut
export const DEFAULT_CURRENCY: Currency = 'XOF';

// Taux de change approximatifs (à mettre à jour régulièrement)
// Tous les prix sont stockés en F CFA dans la base de données
export const EXCHANGE_RATES = {
  XOF: { XOF: 1, EUR: 0.0015, USD: 0.0017 },
  EUR: { XOF: 655.96, EUR: 1, USD: 1.08 },
  USD: { XOF: 600, EUR: 0.93, USD: 1 }
} as const;

/**
 * Obtient la devise préférée de l'utilisateur depuis localStorage
 */
export const getPreferredCurrency = (): Currency => {
  const saved = localStorage.getItem('preferred_currency');
  return (saved as Currency) || DEFAULT_CURRENCY;
};

/**
 * Sauvegarde la devise préférée de l'utilisateur
 */
export const setPreferredCurrency = (currency: Currency): void => {
  localStorage.setItem('preferred_currency', currency);
};

/**
 * Convertit un prix d'une devise à une autre
 */
export const convertPrice = (price: number, fromCurrency: Currency, toCurrency: Currency): number => {
  if (fromCurrency === toCurrency) return price;
  
  const rate = EXCHANGE_RATES[fromCurrency][toCurrency];
  return Math.round(price * rate * 100) / 100;
};

/**
 * Formate un prix avec la devise spécifiée
 * Les prix sont stockés en F CFA dans la base de données
 */
export const formatPrice = (price: number, currency: Currency = getPreferredCurrency(), showSymbol: boolean = true): string => {
  // Convertir le prix depuis F CFA vers la devise souhaitée
  const convertedPrice = convertPrice(price, 'XOF', currency);
  
  if (currency === 'XOF') {
    const formatted = new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertedPrice);
    return showSymbol ? `${formatted} F CFA` : formatted;
  }
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(convertedPrice);
};

/**
 * Formate un prix avec le symbole personnalisé
 */
export const formatPriceWithSymbol = (price: number, currency: Currency = getPreferredCurrency()): string => {
  return formatPrice(price, currency, true);
};

/**
 * Exemple de conversion pour vos tests :
 * 110005 F CFA = 110005 * 0.0015 = 165.01 EUR
 * 110005 F CFA = 110005 * 0.0017 = 187.01 USD
 */
