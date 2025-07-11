//TODO - 모달 창 ui 깨지는 거 물어보기 => 리팩토링할 때 답변(박서영)

//TODO - 폼 유효성 검사 상의
//TODO - 날짜, 시간 유효성 검사 고려 (경매 최소 기간 상의)
//TODO - 날짜 시간 업로드 리팩토링하기
//FIXME - 경매를 등록할 때, sellerId는 로그인한 유저의 아이디로 변경하기
//NOTE - 달력 아이콘 앞으로 이동시키면 가운데 정렬됨
//TODO - 색 물어보고 수정하기
//TODO - 업체명 물어보기
//TODO - 경매 수정시 이미지 업로드 처리 수정(이미지를 또 업로드함)
//TODO - 날짜 유효성 검사 수정하기
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import ImageUploader from 'src/features/auction/ImageUploader';
import Image from 'next/image';
import { addHours, compareAsc, format, set, subDays } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover';
import { Calendar } from '@repo/ui/components/ui/calendar';
import { ko } from 'date-fns/locale';
import { TZDate } from 'react-day-picker';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { fetchAuctionById } from 'src/entities/auction/api';
import PageContainer from 'src/shared/PageContainer';
import { uploadImage } from 'src/entities/auction/supabase';

export default function AuctionForm({ auctionIdParam }: { auctionIdParam: string | undefined }) {
  const isEditing: boolean = auctionIdParam ? true : false;
  const [isFormLoading, setIsFormLoading] = useState<boolean>(isEditing);

  const [showPostCodeSearch, setShowPostCodeSearch] = useState<boolean>(false);
  const [confirmPostCode, setConfirmPostCode] = useState<boolean>(isEditing);

  const [previewImages, setPreviewImages] = useState<{ id: string; data: string; isUrl: boolean }[]>([]);
  const router = useRouter();

  const {
    data: auction,
    isLoading: isDataLoading,
    isError
  } = useQuery({
    queryKey: ['auctionForm'],
    queryFn: () => fetchAuctionById(auctionIdParam),
    enabled: !!auctionIdParam
  });

  const formSchema = z.object({
    title: z
      .string()
      .min(5, {
        message: '경매 제목은 최소 5자가 되어야 합니다.'
      })
      .max(50, {
        message: '경매 제목은 최대 50자가 되어야 합니다.'
      }),
    address: z
      .string()
      .min(5, { message: '주소는 최소 5글자가 되어야 합니다.' })
      .refine(() => confirmPostCode, { message: '주소 검색을 통해 주소를 입력해야 합니다.' }),
    detailAddress: z.string().min(5, { message: '상세 주소는 최소 5글자가 되어야 합니다.' }),
    startDay: z.date({ message: '경매 시작일을 입력해야 합니다.' }),
    startTime: z.string().min(8, { message: '경매 시작 시간을 입력해야 합니다.' }),
    endDay: z.date({ message: '경매 종료일을 입력해야 합니다.' }),
    endTime: z.string().min(8, { message: '경매 종료 시간을 입력해야 합니다.' }),
    description: z.string().min(5, { message: '상세 내용은 최소 5글자가 되어야 합니다.' }).max(500, {
      message: '상세 내용은 최대 500자가 되어야 합니다.'
    }),
    startingPoint: z.string().refine((value) => Number(value) > 0, { message: '최소 포인트는 0보다 커야합니다.' }),
    maxPoint: z.string().refine((value) => Number(value) > 0, { message: '최대 포인트는 0보다 커야합니다.' })
  });

  const getFormDefaultValues = useCallback(() => {
    const today = new Date();
    const startDay = new TZDate(today, 'Asia/Seoul');
    const endDay = addHours(startDay, 25); //NOTE - 임시로 설정한 기본 값

    const startTime = format(startDay, 'HH:mm:ss');
    const endTime = format(endDay, 'HH:mm:ss');

    return {
      title: '',
      address: '',
      startDay,
      startTime,
      endDay,
      endTime,
      detailAddress: '',
      description: '',
      startingPoint: '0',
      maxPoint: '0'
    };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getFormDefaultValues()
  });

  useEffect(() => {
    async function setFormDefaultValues() {
      if (!isEditing) {
        return;
      }

      console.log('auctions', auction);

      if (auction) {
        const { title, address, start_time, end_time, description, image_urls, starting_point, max_point } = auction;

        const startDay = new TZDate(start_time, 'Asia/Seoul');
        const startTime = format(startDay, 'HH:mm:ss');

        const endDay = new TZDate(end_time, 'Asia/Seoul');
        const endTime = format(endDay, 'HH:mm:ss');

        form.reset({
          title,
          address: address[0],
          detailAddress: address[1],
          startDay,
          startTime,
          endDay,
          endTime,
          description,
          startingPoint: String(starting_point),
          maxPoint: String(max_point)
        });

        if (image_urls) {
          setPreviewImages(image_urls.map((image: string) => ({ id: uuidv4(), data: image, isUrl: true })));
        }

        setIsFormLoading(false);
      } else {
        form.reset(getFormDefaultValues());
        setIsFormLoading(false);
      }
    }

    setFormDefaultValues();
  }, [auctionIdParam, form, getFormDefaultValues, isEditing, auction]);

  useEffect(() => {
    if (confirmPostCode) {
      form.trigger('address');
    }
  }, [confirmPostCode, form]);

  const fetchDetailPageUserInfo = async (userId: string | null) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/user-info?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || '사용자 정보 조회 중 오류가 발생했습니다.');
    }
    const data = await res.json();
    return data.data;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let imageUrls: string[] = [];
    const {
      title,
      address,
      detailAddress,
      startDay,
      startTime,
      endDay,
      endTime,
      description,
      startingPoint,
      maxPoint
    } = values;

    try {
      const imageUploadPromise = previewImages.map(async (prevImage): Promise<string> => {
        if (!prevImage.isUrl) {
          const data = await uploadImage(prevImage.data);
          return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/` + data.fullPath;
        }
        return prevImage.data;
      });

      imageUrls = await Promise.all(imageUploadPromise);
      console.log('image url', imageUrls);
    } catch (error) {
      console.log(error);
    }

    const korStartTime = startTime.split(':');
    const korStartDate = set(startDay, {
      hours: Number(korStartTime[0]),
      minutes: Number(korStartTime[1]),
      seconds: Number(korStartTime[2])
    });
    const utcStartDate = new TZDate(korStartDate, 'utc');

    const korEndTime = endTime.split(':');
    const korEndDate = set(endDay, {
      hours: Number(korEndTime[0]),
      minutes: Number(korEndTime[1]),
      seconds: Number(korEndTime[2])
    });
    const utcEndDate = new TZDate(korEndDate, 'utc');
    const auctionId = uuidv4();
    const { seller_id: sellerId } = await fetchDetailPageUserInfo('');
    const fetchUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions`;
    console.log('셀러', sellerId);
    const data = await fetch(fetchUrl, {
      method: isEditing ? 'PATCH' : 'POST',
      body: JSON.stringify({
        auction_id: isEditing ? auctionIdParam : auctionId,
        seller_id: sellerId,
        title,
        address: [address, detailAddress],
        start_time: utcStartDate,
        end_time: utcEndDate,
        description,
        starting_point: startingPoint,
        max_point: maxPoint,
        image_urls: imageUrls,
        updated_at: new TZDate(new Date(), 'utc')
      })
    });
    const result = await data.json();

    console.log(values);
    console.log('결과', result);
    console.log('옥션아이디', auctionId);
    if (isEditing) {
      router.push(`/auctions/${auctionIdParam}`);
    } else {
      router.push(`/auctions/${auctionId}`);
    }
  }

  const handlePostCodeSearch = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    form.setValue('address', fullAddress);
    form.trigger('address');
    setConfirmPostCode(true);
    setShowPostCodeSearch(false);
  };

  if (isError) {
    return <p>에러 발생</p>;
  }

  if (isFormLoading || isDataLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageContainer>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    사업체 주소 <span className="text-(--color-red)">&#42;</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="상품 위치 또는 주소를 입력하세요." disabled={true} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상세 주소</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="상품의 상세 위치 또는 상세 주소를 입력하세요."
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="base"
              onClick={() => {
                setShowPostCodeSearch((prev) => !prev);
              }}
            >
              {showPostCodeSearch ? '주소 검색 닫기' : '주소 검색'}
            </Button>
            {showPostCodeSearch && <DaumPostcodeEmbed onComplete={handlePostCodeSearch} />}
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="startDay"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>
                      경매 시작일 <span className="text-(--color-red)">&#42;</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <FaCalendarAlt className="text-(--color-accent) h-4 w-4 opacity-50" />
                            {field.value ? format(field.value, 'PPP', { locale: ko }) : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) => {
                          //   const todayDate = subDays(new TZDate(new Date(), 'Asia/Seoul'), 1);
                          //   const endDate = new TZDate(form.getValues('endDay'), 'Asia/Seoul');
                          //   const compareTodayDate = compareAsc(date, todayDate);
                          //   const compareEndDate = compareAsc(date, endDate);

                          //   return compareTodayDate === -1 || compareEndDate === 1;
                          // }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>
                      경매 시작 시간<span className="text-(--color-red)">&#42;</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="bg-white" type="time" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="endDay"
                render={({ field }) => (
                  <FormItem className="flex w-1/2 flex-col">
                    <FormLabel>
                      경매 종료일<span className="text-(--color-red)">&#42;</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <FaCalendarAlt className="text-(--color-accent) h-4 w-4 opacity-50" />
                            {field.value ? format(field.value, 'PPP', { locale: ko }) : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) => {
                          //   const startDate = new TZDate(form.getValues('startDay'), 'Asia/Seoul');
                          //   const compareEndDate = compareAsc(date, startDate);

                          //   return compareEndDate === -1;
                          // }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>
                      경매 종료 시간<span className="text-(--color-red)">&#42;</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="bg-white" type="time" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    제목<span className="text-(--color-red)">&#42;</span>
                  </FormLabel>
                  <FormControl>
                    <Input className="bg-white" placeholder="경매 상품의 제목을 입력하세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    상세 내용 <span className="text-(--color-red)">&#42;</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none bg-white"
                      rows={5}
                      placeholder="상품에 대한 자세한 설명을 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startingPoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    경매 시작 포인트 <span className="text-(--color-red)"> &#42;</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      type="number"
                      placeholder="경매의 시작 포인트를 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxPoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    경매 상한 포인트 <span className="text-(--color-red)"> &#42;</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      type="number"
                      placeholder="경매의 상한 포인트를 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>상품 이미지</FormLabel>
            <ImageUploader onPreviewImages={setPreviewImages} />

            <Button type="submit" className="h-12 w-full" variant="base">
              {isEditing ? '수정하기' : '등록하기'}
            </Button>
          </form>
        </Form>
        <ul>
          {previewImages &&
            previewImages.map((previewImage) => {
              return (
                <li key={previewImage.id} className="relative">
                  <Button
                    onClick={() => setPreviewImages((prev) => prev.filter((image) => image.id !== previewImage.id))}
                    className="absolute left-72 top-1"
                  >
                    X
                  </Button>
                  <Image alt={'img'} src={previewImage.data} width={300} height={300} />
                </li>
              );
            })}
        </ul>
      </PageContainer>
    </>
  );
}
