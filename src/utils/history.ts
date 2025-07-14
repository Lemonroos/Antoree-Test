export function addToHistory(productId: string) {
  const key = 'viewHistory';
  const raw = localStorage.getItem(key);
  const arr: string[] = raw ? JSON.parse(raw) : [];
  if (!arr.includes(productId)) {
    arr.push(productId);
    localStorage.setItem(key, JSON.stringify(arr));
  }
}

export function getHistory(): string[] {
  return JSON.parse(localStorage.getItem('viewHistory') || '[]');
}

export function clearHistory() {
  localStorage.removeItem('viewHistory');
}