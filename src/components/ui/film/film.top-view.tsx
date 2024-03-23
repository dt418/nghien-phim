import React from "react";
import Link from "next/link";

import { IMovieBase } from "@/types/movie-list";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

interface ITopViewProps {
  topViewData: IMovieBase[];
  views: Record<string,number>
}
export const TopView = (props: ITopViewProps) => {
  const { topViewData, views } = props;
  
  return (
    <aside className="flex flex-wrap">
      <div className="w-full">
        <span className="uppercase text-md font-medium border-b border-border w-full block pb-2">
          Top Xem Nhiều
        </span>
        <Tabs defaultValue="ngay" className="w-full mt-2">
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
                    {topViewData?.map((filmItem, index) => {
                      return (
                        <Link
                          key={filmItem.slug}
                          href={`/phim/${filmItem.slug}`}
                          title={filmItem.name}
                          className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                        >
                          <div className="col-span-2">
                            <div className="font-medium text-md hover:shadow-lg">
                              <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-10 ml-1">
                            <span className="block truncate capitalize">
                              {filmItem.name}
                            </span>
                            <span className="text-xs">{views[filmItem.slug]} lượt xem</span>
                          </div>
                        </Link>
                      );
                    })}
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
                    {topViewData?.slice(0, 8)?.map((filmItem, index) => {
                      return (
                        <Link
                          key={filmItem.slug}
                          href={`/phim/${filmItem.slug}`}
                          title={filmItem.name}
                          className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                        >
                          <div className="col-span-2">
                            <div className="font-medium text-md hover:shadow-lg">
                              <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-10 ml-1">
                            <span className="block truncate capitalize">
                              {filmItem.name}
                            </span>
                            <span className="text-xs">{views[filmItem.slug]} lượt xem</span>
                          </div>
                        </Link>
                      );
                    })}
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
                    {topViewData?.slice(0, 5)?.map((filmItem, index) => {
                      return (
                        <Link
                          key={filmItem.slug}
                          href={`/phim/${filmItem.slug}`}
                          title={filmItem.name}
                          className="grid items-center grid-cols-12 pb-2 over:shadow-xl transform group hover:opacity-80 hover:scale-105 duration-300 gapx-3"
                        >
                          <div className="col-span-2">
                            <div className="font-medium text-md hover:shadow-lg">
                              <span className="leading-7 text-xs bg-[#a5695fd4] w-7 h-7 inline-block rounded-full text-center">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-10 ml-1">
                            <span className="block truncate capitalize">
                              {filmItem.name}
                            </span>
                            <span className="text-xs">{views[filmItem.slug]} lượt xem</span>
                          </div>
                        </Link>
                      );
                    })}
                    {/*]*/}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  );
};
