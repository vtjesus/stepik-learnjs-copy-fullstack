// import { db } from '@/drizzle/db';
// import { Comment } from '@/drizzle/schema';
// import { asc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// let wss: null | WebSocketServer = null;
export async function GET() {
	return NextResponse.json('Это нужно')
}
// export async function GET(req: NextRequest) {
// 	const chapter_id = req.nextUrl.searchParams.get('chapter_id');

// 	if (!wss) {
// 		wss = new WebSocketServer({
// 			port:
// 				Number(process.env.NEXT_PUBLIC_WEBSOCKET_PORT?.split(':')[1]) || 2020,
// 		});

// 		wss.on('connection', async (ws, req) => {
// 			ws.on('message', async req => {
// 				const data: { type: string; data: any } = JSON.parse(req.toString());
// 				if (data.type == 'send_comment') {
// 					const comments = await db.query.Comment.findMany({
// 						where: (comment, { eq }) =>
// 							eq(comment.chapter_id, Number(data.data.chapter_id)),
// 						orderBy: [asc(Comment.rate)],
// 						with: {
// 							user: true,
// 						},
// 					});

// 					wss?.clients.forEach(client => {
// 						client.send(
// 							JSON.stringify({ type: 'new_comment', data: comments })
// 						);
// 					});
// 				}
// 			});
// 		});
// 	}

// 	return NextResponse.json(null);
// }
