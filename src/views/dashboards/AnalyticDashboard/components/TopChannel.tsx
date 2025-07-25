import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import { CSVLink } from 'react-csv'
import { NumericFormat } from 'react-number-format'
import type { TopChannelData } from '../types'

type TopChannelProps = {
    data: TopChannelData
}

const { TBody, THead, Tr, Th, Td } = Table

const TopChannel = ({ data }: TopChannelProps) => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Player Acquisition Channels</h4>
                <CSVLink
                    filename="player-acquisition-channels.csv"
                    data={data.channels.map((channel) => {
                        return {
                            Channel: channel.name,
                            Percentage: `${channel.percentage}%`,
                            Total: channel.total,
                        }
                    })}
                >
                    <Button size="sm">Export data</Button>
                </CSVLink>
            </div>
            <div className="mt-5">
                <div className="mb-2">New Players</div>
                <div className="flex items-end gap-2 mb-1">
                    <h3>
                        <NumericFormat
                            displayType="text"
                            value={data.visitors}
                            thousandSeparator={true}
                        />
                    </h3>
                    <GrowShrinkValue
                        className="font-bold"
                        value={2.6}
                        suffix="%"
                        positiveIcon="+"
                        negativeIcon=""
                    />
                </div>
                <Table className="mt-6" hoverable={false}>
                    <THead>
                        <Tr>
                            <Th className="px-0!">Channel</Th>
                            <Th>Percentage</Th>
                            <Th className="px-0!">Total</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {data.channels.map((channel) => (
                            <Tr key={channel.id}>
                                <Td className="px-0!">
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            size={28}
                                            src={channel.img}
                                            className="bg-transparent"
                                        />
                                        <div className="heading-text font-bold">
                                            {channel.name}
                                        </div>
                                    </div>
                                </Td>
                                <Td>{channel.percentage}%</Td>
                                <Td className="px-0!">
                                    <NumericFormat
                                        displayType="text"
                                        value={channel.total}
                                        thousandSeparator={true}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </div>
        </Card>
    )
}

export default TopChannel
