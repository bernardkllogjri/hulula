import en from '../assets/locales/en-gb.json'
import it from '../assets/locales/it-it.json'

export default (key) => {
  
  const lng = localStorage.getItem('APP_LANGUAGE')

  if(lng === 'EN') { return en[key] }
  if(lng === 'IT') { return it[key] }

  return 'Translations missing'
}