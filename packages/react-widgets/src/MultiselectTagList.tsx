import React, { ReactNode } from 'react'
import MultiselectTag, { MultiselectTagProps } from './MultiselectTag'
import { RenderProp } from './types'
import { TextAccessorFn } from './Accessors'

export type RenderTagProp<TDataItem> = RenderProp<{ item: TDataItem }>

export type TagComponentProp = React.ComponentType<MultiselectTagProps>

interface MultiselectTagListProps<TDataItem> {
  id: string
  label?: string
  value: readonly TDataItem[]
  focusedItem?: TDataItem
  clearTagIcon: React.ReactNode
  textAccessor: TextAccessorFn
  onDelete: (
    dataItem: TDataItem,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  renderTagValue?: RenderTagProp<TDataItem>
  tagOptionComponent?: TagComponentProp

  disabled?: readonly TDataItem[]
  children?: ReactNode
}

function MultiselectTagList<TDataItem>({
  id,
  value,
  textAccessor,
  label,
  disabled,
  onDelete,
  children,
  clearTagIcon,
  renderTagValue,
  tagOptionComponent: TagOption = MultiselectTag,
}: MultiselectTagListProps<TDataItem>) {
  return (
    <div
      id={id}
      role="listbox"
      aria-label={label}
      className="rw-multiselect-taglist"
    >
      {value.map((item, i) => {
        return (
          <TagOption
            key={i}
            dataItem={item}
            onRemove={onDelete}
            clearTagIcon={clearTagIcon}
            disabled={disabled?.includes(item)}
          >
            {renderTagValue ? renderTagValue({ item }) : textAccessor(item)}
          </TagOption>
        )
      })}
      {children}
    </div>
  )
}

export default MultiselectTagList
