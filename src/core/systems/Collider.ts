import type { IEntity } from '../@types/IEntity'

import type { ISystemHandler } from '../@types/ISystemHandler'

type IDep = ['position', 'collider']

export const Collider: ISystemHandler<IDep> = (es, w) => {
  es.forEach((e) => {
    const target = e.data
    const { enabled, role, onCollision } = target.collider

    if (!enabled || role !== 'target') return

    const player = w.get('player').data
    if (!player) return

    const { x, y } = player.position
    const { x: cx, y: cy } = target.position

    const isLeft = x < cx + target.collider.size
    const isRight = x > cx - player.collider.size
    const isTop = y > cy - player.collider.size
    const isBottom = y < cy + target.collider.size

    target.collider.collidingAt = {
      left: isLeft,
      right: isRight,
      top: isTop,
      bottom: isBottom,
    }

    const collisionData = [isLeft, isRight, isTop, isBottom]

    collisionData.forEach((state, i) => {
      // if (!ctx) return
      // ctx.fillStyle = state ? '#26de81' : '#eb3b5a'
      // ctx.fillRect(i * 10, 15, 10, 10)
    })

    const isColliding = isLeft && isRight && isTop && isBottom

    if (isColliding && onCollision) {
      w.act(onCollision.type, onCollision.data, e as IEntity)
    }

    target.collider.isColliding = isColliding
    player.collider.isColliding = isColliding
  })
}
