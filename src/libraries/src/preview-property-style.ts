import type { DeviceType } from '@/features'
import type { PropertyStyleData } from '@/types'

export function PreviewPropertyStyle(props: { device?: DeviceType; styleData: PropertyStyleData }): HTMLStyleElement {
	/* === props === */
	const { device, styleData } = props

	const { caption, notice, separator, table } = styleData

	const styleElement = document.createElement('style')

	const style = `#novo{
        width: 100%;
      }

      #novo > *{
        margin-bottom: 32px;
      }

      .caption {
        color: ${caption.color};
        font-size: ${caption.fontSize}px;
      }
        
      .separator{
        background-color: ${separator.color};
        height: ${separator.weight}px;
        border: none;
      }
        
      .notice{
        color: ${notice.color};
        border: ${notice.variant === 'outline' ? 'currentColor 1px solid' : 'none'};
        font-size: ${notice.fontSize}px;
        display: flex;
        align-items: start;
        column-gap: 0.75rem;
        row-gap: 0.5rem;
        padding: ${notice.variant === 'outline' || notice.variant === 'fill' ? '1rem' : '0'};
        background-color: ${notice.variant === 'fill' ? `${notice.color}0f` : 'transparent'};
        flex-direction: column;

        @media (min-width: 48rem) {
          flex-direction: ${notice.variant === 'flex' ? 'row' : 'column'}
          }
      }
      .notice-title{
        width: fit-content;
        font-size: 1.2em;
        flex-shrink: 0;
        border: ${notice.variant === 'flex' ? 'currentColor 1px solid' : 'none'};
        padding: ${notice.variant === 'flex' ? '0.75rem 0.5rem' : '0'};
      }
      .notice-content{
        border-top: ${notice.variant === 'separator' ? 'currentColor 1px solid' : 'none'};
        padding-top: ${notice.variant === 'separator' ? '0.5rem' : '0'};
        white-space: pre-wrap;
        line-height: 1.625;
      }

      .table-wrapper{
        color: ${table.color};
        font-size: ${table.fontSize}px;
      }
      .table{
        display: flex;
        flex-direction: column;
        border: ${table.outline ? 'currentColor 1px solid' : 'none'};
      }
      .table-subject{
        margin-bottom: 0.5rem;
      }
      .table-content:not(:first-child){
        border-top: ${table.separator ? 'currentColor 1px solid' : 'none'};
      }
      .table-content{
        display: grid;
        flex-direction: column;
        
        @media (min-width: 39rem) {
        grid-template-columns: ${device === 'mobile' ? 'repeat(1, minmax(0, 1fr))' : '1fr 3fr'};
        }
      }
      .table-content:nth-child(odd){
        background-color: ${table.variant === 'odd' ? `${table.color}0f` : 'transparent'};
      }
      .table-content:nth-child(even){
        background-color: ${table.variant === 'even' ? `${table.color}0f` : 'transparent'};
      }
      
      .table-label{
        padding: 0.5rem;
        background-color: ${table.variant === 'label' ? `${table.color}0f` : 'transparent'};
      }
      .table-value{
        padding: 0.5rem;
        background-color: ${table.variant === 'value' ? `${table.color}0f` : 'transparent'};
        border-top: ${table.separator && device === 'mobile' && 'currentColor 1px solid'};

        @media (max-width: 39rem) {
        border-top: ${table.separator && 'currentColor 1px solid'};
        }

        @media (min-width: 39rem) {
        border-left: ${table.separator && device === 'mobile' ? 'none' : 'currentColor 1px solid'};
        }
      }
      .table-caption{
        font-size: 0.8em;
        display: block;
        margin-top: 0.5rem;
      }
         `

	styleElement.textContent = style

	return styleElement
}
