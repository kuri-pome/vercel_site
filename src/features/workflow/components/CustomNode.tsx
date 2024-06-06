'use client'
import Image from 'next/image'

import { memo, type FC, type CSSProperties } from 'react'
import { Handle, Position, type NodeProps, NodeResizer } from 'reactflow'

const sourceHandleStyle: CSSProperties = { left: 'auto', right: 'auto' }

const CustomNode: FC<NodeProps> = ({ data }) => {
  return (
    <div className="border-4 w-[150px] h-[50px] text-center">
      <div className="flex">
        <Image
          alt={data.label}
          src={`/img/workflow/${data.name}.svg`}
          width={30}
          height={30}
        ></Image>
        {`${data.name}`}
      </div>
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
