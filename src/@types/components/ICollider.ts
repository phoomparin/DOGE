import type { IAction } from '../core'

export interface ICollider {
  enabled: boolean
  role: 'source' | 'target'
  size: number
  isColliding?: boolean
  collidingAt?: Partial<Record<'left' | 'top' | 'right' | 'bottom', boolean>>
  onCollision?: IAction
}
