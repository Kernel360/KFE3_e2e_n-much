import { NextResponse } from 'next/server';
import { selectUserIdByAuctionId } from 'src/entities/auction/serverActions';
import { getServerUser, getServerUserWithProfile } from 'src/entities/auth/serverAction';
import type { NextRequest } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;
  const { searchParams } = request.nextUrl;

  // 로그인 없이 접근 가능한 페이지들
  const publicPaths = ['/', '/onboarding', '/auth/signup', '/auth/callback'];

  // 공개 페이지는 통과
  if (publicPaths.includes(pathName)) {
    return NextResponse.next();
  }

  // 한 번만 로그인 체크
  const userInfo = await getServerUser();
  if (!userInfo) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 로그인 후 추가 비즈니스 로직
  // 경매 수정 권한 체크
  if (pathName === '/auctions/write') {
    //NOTE - 경매 등록/수정 페이지에서 로그인되어 있지 않으면 로그인 페이지로 이동

    try {
      const userWithProfile = await getServerUserWithProfile();
      const userAddressId = userWithProfile.address_id;
      const userRole = userWithProfile.role;

      if (!userAddressId) {
        return NextResponse.redirect(new URL('/mypage/addresses/write', request.url));
      }

      if (userRole === 'buyer') {
        return NextResponse.redirect(new URL('/mypage', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/main', request.url));
    }

    const auctionId = searchParams.get('auction_id')?.trim();

    if (auctionId) {
      try {
        const authorId: string = await selectUserIdByAuctionId(auctionId);
        if (authorId !== userInfo.id) {
          return NextResponse.redirect(new URL('/main', request.url));
        }
      } catch {
        return NextResponse.redirect(new URL('/main', request.url));
      }
    }
  }

  // 경매 목록 쿼리 파라미터
  if (pathName === '/auctions') {
    const order = searchParams.get('order')?.trim();
    const keyword = searchParams.get('keyword')?.trim();
    const orderList = ['end_date', 'favorite_count', 'created_at'];
    let isUrlChanged = false;

    if (!order || !orderList.includes(order)) {
      searchParams.set('order', 'end_date');
      isUrlChanged = true;
    }

    if (!keyword) {
      searchParams.delete('keyword');
    }

    if (isUrlChanged) {
      return NextResponse.redirect(request.nextUrl);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/onboarding', '/auth/signup', '/auth/callback', '/auctions/write', '/auctions']
};
