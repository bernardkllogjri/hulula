import en from '../assets/locales/en-gb'
import it from '../assets/locales/it-it'

export default (key) => {
  
  const lng = localStorage.getItem('APP_LANGUAGE')

  if(lng === 'EN') { return en[key] }
  if(lng === 'IT') { return it[key] }

  return 'Translations missing'
}