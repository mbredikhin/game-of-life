export const setAppearance = (isDarkMode: boolean) => {
  document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
};
