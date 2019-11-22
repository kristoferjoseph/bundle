import Header from '../ui/header.js'
import Footer from '../ui/footer.js'

export default function Main (props) {
  return `
<section>
  ${Header()}
  <h1>Main</h1>
  ${Footer()}
</section>
  `
}
