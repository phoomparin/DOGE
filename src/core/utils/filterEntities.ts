import type { IEntityOf } from '../../@types/entities'
import type { IComponentType } from '../../@types/components'

import type { IEntity } from '../../@types/core'

export function filterEntities(entities: IEntity[], deps: IComponentType[]) {
  if (deps.length === 0) return entities as IEntityOf[]

  return entities.filter((e) => {
    const keys = Object.keys(e.data)

    return deps?.every((dep) => keys.includes(dep))
  }) as IEntityOf[]
}
