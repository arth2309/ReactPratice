import { useNavigate, useLocation } from 'react-router'
import { useCallback, useMemo } from 'react'
import queryString from 'query-string'
import { StateValue,OrderBy,IdType,KeyValue } from '../interface/Interface'



const isSet = (value: StateValue): boolean => value !== undefined

const isOrderBy = (value: StateValue): value is OrderBy =>
  isSet(value) &&
  value !== null &&
  (value as OrderBy).field !== undefined &&
  (value as OrderBy).direction !== undefined

const isOfIdListType = (value: StateValue): value is IdType[] =>
  isSet(value) &&
  Array.isArray(value) &&
  value.length > 0 &&
  value[0] !== undefined &&
  (value as IdType[])[0].id !== undefined

const getOrderByFromSearch = (parsedSearch: KeyValue) => {
  const value = parsedSearch.orderBy as string

  if (value) {
    const isDescending = value[0] === '-'

    return {
      field: isDescending ? value.substr(1) : value,
      direction: isDescending ? 'DESC' : 'ASC',
    }
  }

  return {
    field: 'updated_at',
    direction: 'DESC',
  }
}

const getValueFromSearchString = (
  key: string,
  parsedSearch: KeyValue,
  defaultValue: StateValue
): StateValue => {
  const parsedValue = parsedSearch[key]
  const arrayKey = `${key}[]`
  const parsedArrayValue = parsedSearch[arrayKey]
  let value = defaultValue

  if (parsedValue) {
    if (isOrderBy(defaultValue)) {
      value = getOrderByFromSearch(parsedSearch)
    } else {
      value = parsedValue
    }
  } else if (parsedArrayValue) {
    if (!Array.isArray(parsedArrayValue)) {
      value = [parsedArrayValue] as string[]
    } else {
      value = parsedArrayValue
    }
  }

  return value
}

const parseSearchStringToState = <T extends KeyValue>(
  searchString: string,
  defaults: T
): T => {
  const parsedSearch = queryString.parse(searchString) as T

  // TODO: need to include all keys from type
  return Object.keys(defaults).reduce(
    (acc, key) => ({
      ...acc,
      [key]: getValueFromSearchString(key, parsedSearch, defaults[key]),
    }),
    {} as T
  )
}

const encodeValue = (value: StateValue): string | string[] | number[] => {
  if (isOrderBy(value))
    return `${value.direction === 'DESC' ? '-' : ''}${value.field}`

  if (isOfIdListType(value)) return value.map(({ id, name }) => String(id))

  if (Array.isArray(value) && value.length > 0) return value

  return isSet(value) && value !== null ? String(value) : ''
}

const addIfChanged = <T>(
  acc: T,
  key: string,
  value: StateValue,
  defaultValue: StateValue
) => {
  const [encodedValue, encodedDefaultValue] = [
    encodeValue(value),
    encodeValue(defaultValue),
  ]

  if (encodedValue === encodedDefaultValue) return acc
  if (Array.isArray(encodedValue)) return { ...acc, [`${key}[]`]: encodedValue }

  return { ...acc, [key]: encodedValue }
}

export const overrideAndEncodeState = <T extends KeyValue>(
  overrides: T,
  state: T,
  defaults: T
): T =>
  Object.keys(defaults).reduce(
    (acc, key) =>
      addIfChanged(
        acc,
        key,
        isSet(overrides[key]) ? overrides[key] : state[key],
        defaults[key]
      ),
    {} as T
  )

export const useUrlSearchState = <T extends KeyValue>(
  defaults: T
): [T, (setState: T) => void] => {
  const navigate = useNavigate()
  const { search, pathname } = useLocation()

  const state = useMemo<T>(
    () => parseSearchStringToState<T>(search, defaults) ,
    [search, defaults]
  )

  const setState = useCallback(
    (overrides: T) =>
        navigate(
            `${pathname}?${queryString.stringify(
              overrideAndEncodeState<T>(overrides, state, defaults)
            )}`
          ) ,
          // eslint-disable-next-line 
    [pathname, state, defaults]
  )

  return [state, setState]
}