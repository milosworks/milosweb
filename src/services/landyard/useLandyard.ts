'use client'

import { useEffect, useState } from 'react'
import type { LanyardData } from './types'

interface Heartbeat {
	heartbeat_interval: number
}

interface SocketMessage {
	op: number
	d?: LanyardData | Heartbeat
	t?: string
}

export const DISCORD_ID = '538421122920742942'
const WEBSOCKET_URL = 'wss://api.lanyard.rest/socket'

export function useLanyard() {
	const [lanyardData, setLanyardData] = useState<LanyardData | null>(null)

	useEffect(() => {
		const socket = new WebSocket(WEBSOCKET_URL)
		let heartbeatInterval: NodeJS.Timeout

		socket.onopen = () => {
			console.log('Lanyard WebSocket connection established.')
		}

		socket.onmessage = event => {
			const message: SocketMessage = JSON.parse(event.data)

			switch (message.op) {
				case 0:
					if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
						setLanyardData(message.d as LanyardData)
					}
					break
				case 1: {
					const heartbeat = (message.d as Heartbeat).heartbeat_interval
					heartbeatInterval = setInterval(() => {
						socket.send(JSON.stringify({ op: 3 }))
					}, heartbeat)

					socket.send(
						JSON.stringify({
							op: 2,
							d: {
								subscribe_to_id: DISCORD_ID
							}
						})
					)
					break
				}
				default:
					break
			}
		}

		socket.onclose = () => {
			console.log('Lanyard WebSocket connection closed.')
			clearInterval(heartbeatInterval)
		}

		socket.onerror = error => {
			console.error('Lanyard WebSocket error:', error)
			clearInterval(heartbeatInterval)
			socket.close()
		}

		return () => {
			clearInterval(heartbeatInterval)
			socket.close()
		}
	}, [])

	return lanyardData
}
