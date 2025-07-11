import type React from "react"
import { View } from "react-native"
import { Svg, Circle } from "react-native-svg"
import InterBold from "../Text/InterBold"
import InterRegular from "../Text/InterRegular"

interface ChartData {
  label: string
  value: string | number
  color: string
  percentage: number
}

interface DonutChartProps {
  data: ChartData[]
  centerText?: string
  size?: number
}

const DonutChart: React.FC<DonutChartProps> = ({ data, centerText, size = 120 }) => {
  const radius = 45
  const strokeWidth = 12
  const circumference = 2 * Math.PI * radius

  let cumulativePercentage = 0

  return (
    <View className="flex-row items-center">
      {/* Chart */}
      <View className="relative mr-6">
        <Svg width={size} height={size}>
          {data.map((item, index) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`
            const strokeDashoffset = (-cumulativePercentage * circumference) / 100
            cumulativePercentage += item.percentage

            return (
              <Circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={item.color}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            )
          })}
        </Svg>
        {centerText && (
          <View className="absolute inset-0 justify-center items-center">
            <InterBold className="text-lg">{centerText}</InterBold>
          </View>
        )}
      </View>

      {/* Legend */}
      <View className="flex-1">
        {data.map((item, index) => (
          <View key={index} className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center flex-1">
              <View className="w-3 h-3 rounded-sm mr-3" style={{ backgroundColor: item.color }} />
              <InterRegular className="text-secondaryText text-sm flex-1">{item.label}</InterRegular>
            </View>
            <InterBold className="text-base ml-2">
              {typeof item.value === "string" ? item.value : item.value.toLocaleString()}
            </InterBold>
          </View>
        ))}
      </View>
    </View>
  )
}

export default DonutChart
