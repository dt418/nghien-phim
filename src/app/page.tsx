import Link from "next/link";

// import { Button } from "@/components/ui/button";
import { FilmCarousel } from "@/components/ui/film/film.carousel";
import { FilmList } from "@/components/ui/film/film.list";
import { FilmPagination } from "@/components/ui/film/film.pagination";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFilms } from "@/lib/fetcher";
import { calculatePageList } from "@/lib/pagination";

type THomePageProps = {
  params?: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Home({ searchParams }: THomePageProps) {
  const pageParam =
    typeof searchParams.page === "string" && Number(searchParams.page) > 0
      ? Number(searchParams.page)
      : 1;
  const { items, paginate } = await getFilms(pageParam);
  const totalPage = paginate.total_page;
  const PAGE_TO_DISPLAY = 2;
  let currentPage = 1;
  if (Number(pageParam) > 1) {
    currentPage = Number(pageParam);
  }
  const pageList = calculatePageList(currentPage, PAGE_TO_DISPLAY, totalPage);
  return (
    <main className="container space-y-4">
      <FilmCarousel items={items} title="Thịnh hành" />
      <Separator />
      <section className="grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="flex flex-col sm:col-span-9 col-span-12 gap-2">
          <div className="flex gap-3 pb-2">
            <h2 className="text-[14px] font-medium cursor-pointer transition-all ease-linear duration-100 rounded-sm px-3 py-1 uppercase block bg-[#a5695fd4]">
              PHIM BỘ MỚI
            </h2>
          </div>
          <FilmList items={items} />
          <FilmPagination
            currentPage={currentPage}
            pageList={pageList}
            totalPage={totalPage}
          />
        </div>
        <div className="hidden sm:block sm:col-span-3 col-span-12">
          <div className="">
            <div className="flex flex-wrap">
              <div className="w-full">
                <span className="uppercase text-md font-medium border-b border-border w-full block pb-2">
                  Top Xem Nhiều
                </span>
                <ul className="flex list-none mb-2 pt-2 flex-wrap flex-row">
                  {/*[*/}
                  {/* <li className="cursor-pointer last:mr-0 flex-auto text-center">
                    <Button
                      className="font-medium px-3 py-1 block"
                      variant={"ghost"}
                      size={"sm"}
                    >
                      Ngày
                    </Button>
                  </li>
                  <li className="cursor-pointer last:mr-0 flex-auto text-center">
                    <Button
                      className="font-medium px-3 py-1 block"
                      variant={"ghost"}
                      size={"sm"}
                    >
                      Tuần
                    </Button>
                  </li>
                  <li className="cursor-pointer last:mr-0 flex-auto text-center">
                    <Button
                      className="font-medium px-3 py-1 block"
                      variant={"ghost"}
                      size={"sm"}
                    >
                      Tháng
                    </Button>
                  </li> */}
                  {/*]*/}
                </ul>
                <Tabs defaultValue="ngay" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="ngay">Ngày</TabsTrigger>
                    <TabsTrigger value="thang">Tháng</TabsTrigger>
                    <TabsTrigger value="nam">Năm</TabsTrigger>
                  </TabsList>
                  <TabsContent value="ngay">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                      <div className="px-2 py-3 flex-auto">
                        <div className="tab-content tab-space">
                          <div>
                            {/*[*/}
                            <Link
                              href="/du-phuong-hanh"
                              title="Dữ Phượng Hành"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    1
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Dữ Phượng Hành
                                </span>
                                <span className="text-xs">561.8k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/hoa-gian-lenh"
                              title="Hoa Gian Lệnh"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    2
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Hoa Gian Lệnh
                                </span>
                                <span className="text-xs">360.8k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/kung-fu-panda-4"
                              title="Kung Fu Panda 4"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    3
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Kung Fu Panda 4
                                </span>
                                <span className="text-xs">225.7k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/phim-liet-diem-chi-vu-canh-ky"
                              title="Liệt Diễm Chi Vũ Canh Kỷ"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    4
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Liệt Diễm Chi Vũ Canh Kỷ
                                </span>
                                <span className="text-xs">267.7k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/tai-phiet-x-canh-sat"
                              title="Tài Phiệt X Cảnh Sát"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    5
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Tài Phiệt X Cảnh Sát
                                </span>
                                <span className="text-xs">667k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/dung-rung-dong-vi-anh-2024"
                              title="Đừng Rung Động Vì Anh"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    6
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Đừng Rung Động Vì Anh
                                </span>
                                <span className="text-xs">871.7k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/quat-mo-trung-ma"
                              title="Quật Mộ Trùng Ma"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    7
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Quật Mộ Trùng Ma
                                </span>
                                <span className="text-xs">756.1k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/nguoi-thua-ke-bat-kha-thi"
                              title="Người Thừa Kế Bất Khả Thi"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    8
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Người Thừa Kế Bất Khả Thi
                                </span>
                                <span className="text-xs">729.2k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/nu-hoang-nuoc-mat"
                              title="Nữ Hoàng Nước Mắt"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    9
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Nữ Hoàng Nước Mắt
                                </span>
                                <span className="text-xs">459.5k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/tam-biet-bach-nguyet-quang"
                              title="Tạm Biệt Bạch Nguyệt Quang"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    10
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Tạm Biệt Bạch Nguyệt Quang
                                </span>
                                <span className="text-xs">158.2k lượt xem</span>
                              </div>
                            </Link>
                            {/*]*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="thang">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                      <div className="px-2 py-3 flex-auto">
                        <div className="tab-content tab-space">
                          <div>
                            {/*[*/}
                            <Link
                              href="/du-phuong-hanh"
                              title="Dữ Phượng Hành"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    1
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Dữ Phượng Hành
                                </span>
                                <span className="text-xs">561.8k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/hoa-gian-lenh"
                              title="Hoa Gian Lệnh"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    2
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Hoa Gian Lệnh
                                </span>
                                <span className="text-xs">360.8k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/kung-fu-panda-4"
                              title="Kung Fu Panda 4"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    3
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Kung Fu Panda 4
                                </span>
                                <span className="text-xs">225.7k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/phim-liet-diem-chi-vu-canh-ky"
                              title="Liệt Diễm Chi Vũ Canh Kỷ"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    4
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Liệt Diễm Chi Vũ Canh Kỷ
                                </span>
                                <span className="text-xs">267.7k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/tai-phiet-x-canh-sat"
                              title="Tài Phiệt X Cảnh Sát"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    5
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Tài Phiệt X Cảnh Sát
                                </span>
                                <span className="text-xs">667k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/dung-rung-dong-vi-anh-2024"
                              title="Đừng Rung Động Vì Anh"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    6
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Đừng Rung Động Vì Anh
                                </span>
                                <span className="text-xs">871.7k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/quat-mo-trung-ma"
                              title="Quật Mộ Trùng Ma"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    7
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Quật Mộ Trùng Ma
                                </span>
                                <span className="text-xs">756.1k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/nguoi-thua-ke-bat-kha-thi"
                              title="Người Thừa Kế Bất Khả Thi"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    8
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Người Thừa Kế Bất Khả Thi
                                </span>
                                <span className="text-xs">729.2k lượt xem</span>
                              </div>
                            </Link>
                            {/*]*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="nam">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                      <div className="px-2 py-3 flex-auto">
                        <div className="tab-content tab-space">
                          <div>
                            {/*[*/}
                            <Link
                              href="/du-phuong-hanh"
                              title="Dữ Phượng Hành"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    1
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Dữ Phượng Hành
                                </span>
                                <span className="text-xs">561.8k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/hoa-gian-lenh"
                              title="Hoa Gian Lệnh"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    2
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Hoa Gian Lệnh
                                </span>
                                <span className="text-xs">360.8k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/kung-fu-panda-4"
                              title="Kung Fu Panda 4"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    3
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Kung Fu Panda 4
                                </span>
                                <span className="text-xs">225.7k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/phim-liet-diem-chi-vu-canh-ky"
                              title="Liệt Diễm Chi Vũ Canh Kỷ"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    4
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Liệt Diễm Chi Vũ Canh Kỷ
                                </span>
                                <span className="text-xs">267.7k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/tai-phiet-x-canh-sat"
                              title="Tài Phiệt X Cảnh Sát"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    5
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Tài Phiệt X Cảnh Sát
                                </span>
                                <span className="text-xs">667k lượt xem</span>
                              </div>
                            </Link>
                            <Link
                              href="/dung-rung-dong-vi-anh-2024"
                              title="Đừng Rung Động Vì Anh"
                              className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                            >
                              <div className="col-span-2">
                                <div className="font-medium text-md hover:shadow-lg">
                                  <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                    6
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-10 ml-1">
                                <span className="block truncate capitalize">
                                  Đừng Rung Động Vì Anh
                                </span>
                                <span className="text-xs">871.7k lượt xem</span>
                              </div>
                            </Link>
                            {/*]*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
