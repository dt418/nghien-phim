import React from 'react';
import Link from 'next/link';

import { IMovieBase } from '@/types/movie-list';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';

interface ITopViewProps {
  topViewData: IMovieBase[];
  views: Record<string, number>;
}

export const TopView = (props: ITopViewProps) => {
  const { topViewData, views } = props;

  const sortedTopViewDataByViews = [...topViewData].sort(
    (a, b) => (views[b.slug] || 0) - (views[a.slug] || 0)
  );

  const renderTopViewList = (data: IMovieBase[], sliceCount?: number) => {
    const slicedData = sliceCount ? data.slice(0, sliceCount) : data;
    return slicedData.map((filmItem, index) => (
      <Link
        prefetch
        key={filmItem.slug}
        href={`/phim/${filmItem.slug}`}
        title={filmItem.name}
        className="over:shadow-xl group grid transform grid-cols-12 items-center gap-x-3 pb-2 duration-300 hover:scale-105 hover:opacity-80"
      >
        <div className="col-span-2">
          <div className="text-md font-medium hover:shadow-lg">
            <span className="bg-tertiary inline-block h-7 w-7 rounded-full text-center text-xs leading-7">
              {index + 1}
            </span>
          </div>
        </div>
        <div className="col-span-10 ml-1">
          <span className="block truncate capitalize">{filmItem.name}</span>
          <span className="text-xs">{views[filmItem.slug]} lượt xem</span>
        </div>
      </Link>
    ));
  };

  return (
    <aside className="flex flex-wrap">
      <div className="w-full">
        <span className="text-md block w-full border-b border-border pb-2 font-medium uppercase">
          Top Xem Nhiều
        </span>
        <Tabs defaultValue="ngay" className="mt-2 w-full">
          <TabsList className="w-full">
            <TabsTrigger value="ngay">Ngày</TabsTrigger>
            <TabsTrigger value="thang">Tháng</TabsTrigger>
            <TabsTrigger value="nam">Năm</TabsTrigger>
          </TabsList>
          <TabsContent value="ngay">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg">
              <div className="flex-auto px-2 py-3">
                <div className="tab-content tab-space">
                  <div>{renderTopViewList(sortedTopViewDataByViews)}</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="thang">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg">
              <div className="flex-auto px-2 py-3">
                <div className="tab-content tab-space">
                  <div>{renderTopViewList(sortedTopViewDataByViews, 8)}</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="nam">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg">
              <div className="flex-auto px-2 py-3">
                <div className="tab-content tab-space">
                  <div>{renderTopViewList(sortedTopViewDataByViews, 5)}</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  );
};
