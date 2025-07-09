import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

const primeVueThemeConfig = definePreset(Aura, {
  semantic: {
    colorScheme: {
      dark: {
        formField: {
          background: '#323b46'
        }
      }
    }
  },
  components: {
    datepicker: {
      colorScheme: {
        dark: {
          panel: {
            background: '#323b46'
          },
          header: {
            background: '#323b46'
          }
        }
      }
    },
    datatable: {
      colorScheme: {
        dark: {
          headerBackground: '#222b36',
          headerCellHoverBackground: '#222b36',
          headerCellBackground: '#222b36',
          headerCellColor: 'var(--p-slate-400)',
          rowColor: 'var(--p-slate-400)',
          rowBackground: '#222b36',
          borderColor: 'var(--p-gray-600)'
        }
      }
    },
    dialog: {
      colorScheme: {
        dark: {
          background: '#222b36'
        }
      }
    },
    paginator: {
      colorScheme: {
        dark: {
          background: '#222b36'
        }
      }
    },
    select: {
      colorScheme: {
        dark: {
          overlayBackground: '#323b46'
        }
      }
    }
  }
})

export default primeVueThemeConfig
