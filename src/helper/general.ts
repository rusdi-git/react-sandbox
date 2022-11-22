type RandomDelayParams = {
  minTimeRange?: number;
  maxTimeRange?: number;
};

export async function randomDelay(params: RandomDelayParams) {
  const { minTimeRange = 0, maxTimeRange = 1 } = params;
  const delay = Math.random() * (maxTimeRange - minTimeRange) * 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
}

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

export function formatCurrency(val: number) {
  return currencyFormatter.format(val);
}
