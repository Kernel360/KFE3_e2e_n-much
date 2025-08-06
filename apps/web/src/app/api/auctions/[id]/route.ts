import { NextResponse } from 'next/server';
import { patchAuctionSchema } from 'src/entities/auction/schema/auctionForm';
import {
  deleteAuctionById,
  selectAuction,
  selectAuctionInfoWithAddress,
  selectAuctionSummaryInfoWithAddress,
  updateAuction
} from 'src/entities/auction/supabase';
import { selectBidderRanking, selectEpisodesCount, selectEpisodesWithPagination } from 'src/entities/episode/supabase';
import type { NextRequest } from 'next/server';
import type { AuctionUpdate } from 'src/shared/supabase/types';

type ParamsType = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;

  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type');
  const page = searchParams.get('page');

  let res;

  if (!id || !type) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }
  if ((type === 'page' && !page) || (type === 'page' && typeof page !== 'string')) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    if (type === 'auction_form') {
      res = await selectAuction(id);
    } else if (type === 'episode_list_count') {
      res = await selectEpisodesCount(id);
    } else if (type === 'episode_form') {
      res = await selectAuctionSummaryInfoWithAddress(id);
    } else if (type === 'auction') {
      res = await selectAuctionInfoWithAddress(id);
    } else if (type === 'ranking') {
      res = await selectBidderRanking(id);
    } else if (type === 'page') {
      res = await selectEpisodesWithPagination(Number(page), id);
    }

    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;
  const auction: AuctionUpdate = await request.json();
  const schemaResult = patchAuctionSchema.safeParse(auction);

  if (!schemaResult.success || !id) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await updateAuction(id, auction);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}

export async function DELETE(request: NextRequest, { params }: ParamsType) {
  const { id: auctionId } = await params;

  if (!auctionId) {
    return NextResponse.json({ message: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await deleteAuctionById(auctionId);
    return NextResponse.json(res, { status: 201 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
