import { nav } from '../components/nav'

export default {
  index: nav('book', 'Introduction'),
  start: { title: 'All Features' },
  libraries: { title: 'Libraries' },
  plugins: { title: 'Plugins' },
  wip: { title: 'Work in progress' },
  changelog: nav('clock', 'Changelog')
}
