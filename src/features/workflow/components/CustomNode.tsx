'use client'
import Image from 'next/image'

import { memo, type FC, type CSSProperties } from 'react'
import { Handle, Position, type NodeProps, NodeResizer } from 'reactflow'

const sourceHandleStyle: CSSProperties = { left: 'auto', right: 'auto' }

const CustomNode: FC<NodeProps> = ({ data }) => {
  return (
    <div>
      <Image
        alt={data.label}
        src="/img/vegetables/tomato.svg"
        width={30}
        height={30}
      ></Image>
      <NodeResizer />
      <Handle type="target" position={Position.Top} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        // style={sourceHandleStyle}
      />
    </div>
  )
}

export default memo(CustomNode)
