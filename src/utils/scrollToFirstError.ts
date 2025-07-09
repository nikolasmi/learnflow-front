export const scrollToFirstError = () => {
  const inputElement: HTMLInputElement | HTMLSelectElement | null = document.querySelector('[data-error]')
  if (!inputElement) return
  const top = inputElement.getBoundingClientRect().top + window.scrollY - 100
  scrollTo({ top, behavior: 'smooth' })
}
