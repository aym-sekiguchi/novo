'use client'

import { Slot } from '@radix-ui/react-slot'
import { createContext, useContext, useId } from 'react'
import { Controller, useFormContext, FormProvider } from 'react-hook-form'

import { Label } from '@/components'
import { cn } from '@/utilities'

import type * as LabelPrimitive from '@radix-ui/react-label'
import type { FieldPath, FieldValues, ControllerProps, FieldError } from 'react-hook-form'

// Type
type UseFormFieldReturn = {
	error?: FieldError
	formDescriptionId: string
	formItemId: string
	formMessageId: string
	id: string
	invalid: boolean
	isDirty: boolean
	isTouched: boolean
	isValidating: boolean
	name: string
}

// custom hook
function useFormField(): UseFormFieldReturn {
	const { formState, getFieldState } = useFormContext()
	const fieldContext = useContext(FormFieldContext)
	const itemContext = useContext(FormItemContext)
	const fieldState = getFieldState(fieldContext.name, formState)

	// FormField が FormItem の外側で使われている場合はエラーを出す
	if (!fieldContext) throw new Error('useFormField should be used within <FormField>')

	const { id } = itemContext

	/* === return === */
	return {
		formDescriptionId: `${id}-form-item-description`,
		formItemId: `${id}-form-item`,
		formMessageId: `${id}-form-item-message`,
		id,
		name: fieldContext.name,
		...fieldState,
	}
}

/* -------------------------------- */

/**
 * FormProvider
 *
 * RHFがまだmemo対応していないため使用するファイルに 'use no memo' を記述する
 *
 */
export const Form = FormProvider

/* -------------------------------- */

// Type
type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
	name: TName
}

// Context
const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

/**
 * FormField
 *
 * @param props.name - name属性
 * @param props.rest - 'Controller'その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function FormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
	props: ControllerProps<TFieldValues, TName>,
): React.ReactNode {
	const { name, ...rest } = props

	/* === return === */
	return (
		<FormFieldContext value={{ name }}>
			<Controller name={name} {...rest} />
		</FormFieldContext>
	)
}

/* -------------------------------- */

// Type
export type FormItemProps = React.ComponentProps<'div'>

// Type
type FormItemContextValue = { id: string }

// Context
const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

/**
 * FormItem
 *
 * @param props.className - クラス名
 * @param props.ref - Ref
 * @param props.rest - 'div'その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function FormItem(props: FormItemProps): React.ReactNode {
	const { className, ref, ...rest } = props
	const id = useId()

	/* === return === */
	return (
		<FormItemContext value={{ id }}>
			<div className={cn('space-y-2.5', className)} ref={ref} {...rest} />
		</FormItemContext>
	)
}

/* -------------------------------- */

// Type
export type FormLabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }

/**
 * FormLabel
 *
 * @param props.className - クラス名
 * @param props.ref - Ref
 * @param props.rest - 'Label'その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function FormLabel(props: FormLabelProps): React.ReactNode {
	const { children, className, ref, required = false, ...rest } = props
	const { error, formItemId } = useFormField()

	/* === return === */
	return (
		<Label className={cn('inline-block', error && 'text-destructive', className)} htmlFor={formItemId} ref={ref} {...rest}>
			{children}
			{required && <span className="text-destructive pl-2">*</span>}
		</Label>
	)
}

/* -------------------------------- */

// Type
export type FormControlProps = React.ComponentProps<typeof Slot>

/**
 * FormControl
 *
 * @param props.className - クラス名
 * @param props.ref - Ref
 * @param props.rest - 'FormControl'その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function FormControl(props: FormControlProps): React.ReactNode {
	const { className, ref, ...rest } = props
	const { error, formDescriptionId, formItemId, formMessageId } = useFormField()
	/* === return === */
	return (
		<Slot
			aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
			aria-invalid={!!error}
			className={cn('aria-[invalid=true]:*:border-destructive', className)}
			id={formItemId}
			ref={ref}
			{...rest}
		/>
	)
}

/* -------------------------------- */

// Type
export type FormDescriptionProps = React.ComponentProps<'p'>

/**
 * FormDescription
 *
 * @param props.className - クラス名
 * @param props.ref - Ref
 * @param props.rest - 'p'その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function FormDescription(props: FormDescriptionProps): React.ReactNode {
	const { className, ref, ...rest } = props
	const { formDescriptionId } = useFormField()

	/* === return === */
	return <p className={cn('text-neutral-foreground text-sm', className)} id={formDescriptionId} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type FormMessageProps = React.ComponentProps<'p'>

/**
 * FormMessage
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - Ref
 * @param props.rest - 'p'その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function FormMessage(props: FormMessageProps): React.ReactNode | null {
	const { children, className, ref, ...rest } = props
	const { error, formMessageId } = useFormField()
	const body = error ? (Array.isArray(error) ? error.map((item) => item.message).join('\n') : String(error?.message)) : children

	// body がない場合は null を返す
	if (!body) return null

	/* === return === */
	return (
		<p className={cn('text-destructive text-xs whitespace-pre-wrap', className)} id={formMessageId} ref={ref} {...rest}>
			{body}
		</p>
	)
}
