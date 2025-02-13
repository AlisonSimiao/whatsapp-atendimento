export interface IAdMobCallbackQuery {
    user_id: string;          // O ID do usuário que recebeu a recompensa
    reward_type: string;      // O tipo de recompensa (ex: 'coins', 'gems', etc.)
    reward_amount: number;    // A quantidade de recompensa (ex: 10, 50, etc.)
    transaction_id: string;   // ID único da transação do AdMob
    ad_unit_id: string;       // O ID do bloco de anúncio
    custom_data?: string;     // Dados personalizados (opcional)
  }