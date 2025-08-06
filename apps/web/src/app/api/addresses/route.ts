import { NextResponse, type NextRequest } from 'next/server';
import {
  deleteAddressInfo,
  insertAddressInfo,
  selectDefaultAddress,
  updateAddressInfo
} from 'src/entities/addresses/supabase';

// 기본주소 조회
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get('user_id');

  if (!userId) {
    return NextResponse.json({ error: '유저 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    const res = await selectDefaultAddress(userId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error ${error}` }, { status: 500 });
  }
}

// 주소 등록
export async function POST(request: NextRequest) {
  const addressFormData = await request.json();

  if (!addressFormData) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    await insertAddressInfo(addressFormData);
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error ${error}` }, { status: 500 });
  }
}

// 주소 수정
export async function PATCH(request: NextRequest) {
  const { adrressId, address } = await request.json();

  if (!adrressId || !address) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    await updateAddressInfo(adrressId, address);
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// 주소 삭제
export async function DELETE(request: NextRequest) {
  const { adrressId } = await request.json();

  if (!adrressId) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    await deleteAddressInfo(adrressId);
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
