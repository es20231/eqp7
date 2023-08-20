import { filterValues } from '@/assets/filter-class-values'
import { UserPostDTO } from '@/queries/post.query'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Text } from './Text'

interface SelectFilterProps {
  post?: UserPostDTO
  setSelectedFilter: (value: string) => void
}

const SelectFilter = ({ post, setSelectedFilter }: SelectFilterProps) => {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <Text className="text-start text-xs">
        Você pode aplicar um filtro no seu post!
      </Text>
      <Select.Root
        onValueChange={(value) => {
          setSelectedFilter(value)
        }}
        defaultValue={post?.filter}
      >
        <Select.Trigger className="flex items-center min-w-[20rem] justify-between gap-4 px-4 py-2 dark:bg-dark-slate-gray-500 bg-gray-200 text-zinc-800 dark:text-slate-50 rounded-md">
          <Select.Value placeholder="Selecione um filtro" />
          <Select.Icon>
            <ChevronDown className="text-zinc-800 dark:text-slate-50" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            sideOffset={2}
            className="bg-gray-300 dark:bg-dark-slate-gray-400 w-full rounded-md"
          >
            <ScrollArea.Root className="w-full h-full">
              <ScrollArea.Viewport className="w-full h-full">
                <Select.Viewport className="p-2 h-full">
                  <Select.Group className="flex flex-col gap-1">
                    <Select.Label className="px-6 text-xs leading-6 text-zinc-800 dark:text-slate-50">
                      Filtros disponíveis
                    </Select.Label>
                    <SelectItem value="">Nenhum</SelectItem>
                    {Object.keys(filterValues).map((filter) => (
                      <SelectItem key={filter} value={filterValues[filter]}>
                        {filter}
                      </SelectItem>
                    ))}
                  </Select.Group>
                </Select.Viewport>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex select-none touch-none p-0.5 bg-slate-100 dark:bg-zinc-800 transition-colors duration-[160ms] ease-out hover:bg-slate-200 dark:hover:bg-zinc-950 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="flex-1 dark:bg-slate-100 bg-zinc-700/80 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

const SelectItem = forwardRef<
  ElementRef<typeof Select.Item>,
  ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={twMerge(
        'text-base leading-none text-zinc-800 py-4 dark:text-slate-50 rounded-md flex items-center h-6 pr-9 pl-6 relative select-none data-[disabled]:text-gray-300 dark:data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-gray-200 dark:data-[highlighted]:bg-dark-slate-gray-500',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
        <Check className="text-zinc-800 dark:text-slate-50" size={20} />
      </Select.ItemIndicator>
    </Select.Item>
  )
})
SelectItem.displayName = Select.Item.displayName

export { SelectFilter }
