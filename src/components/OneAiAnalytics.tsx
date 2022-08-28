import React, { FC, useState } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import { TreemapNode } from '../types/clusters';
import { OneAiAnalyticsProps } from '../types/components';
import { ItemsListDisplay } from './ItemsListDisplay';
import { Treemap } from './Treemap';
// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * One Ai Analytics Component
 */
export const OneAiAnalytics: FC<OneAiAnalyticsProps> = ({
  clusters = [],
  itemsDisplay = ItemsListDisplay,
  treemapBigColor = '#031f38',
  treemapSmallColor = '#72b1ca',
  treemapCountFontSize = 14,
  treemapFontFamily = 'sans-serif',
  navbarColor = treemapBigColor,
}) => {
  const [currentClusters, setCurrentClusters] = useState(clusters);
  const [clickedClusters, setClickedClusters] = useState([] as TreemapNode[]);

  const nodeClicked = (node: TreemapNode) => {
    setCurrentClusters(currentClusters => {
      const clickedNode = currentClusters.find(c => c.id === node.id);
      if (clickedNode)
        setClickedClusters(currentClickedCluster => [
          ...currentClickedCluster,
          clickedNode,
        ]);
      return clickedNode?.children ?? currentClusters;
    });
  };

  const goBack = () => {
    setClickedClusters(clickedClusters => {
      clickedClusters.pop();
      setCurrentClusters(clickedClusters.at(-1)?.children ?? clusters);
      return [...clickedClusters];
    });
  };

  return (
    <div className="h-full w-full flex flex-col">
      {clickedClusters.length > 0 && (
        <div
          className="max-h-20 w-full"
          style={{ backgroundColor: navbarColor, height: '15%' }}
        >
          <div className="flex flex-row items-center p-5 justify-between h-full">
            <div className="flex flex-row w-11/12">
              <button
                type="button"
                onClick={goBack}
                className="text-white p-2 bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center"
              >
                <svg
                  className="h-4 w-4 text-gray-500 mr-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {' '}
                  <path stroke="none" d="M0 0h24v24H0z" />{' '}
                  <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
                </svg>
                BACK
              </button>
              <div className="ml-4 text-gray-300 font-bold truncate self-center">
                {clickedClusters.at(-1)!.text}
              </div>
            </div>
            <div className="text-xl text-gray-300 font-bold">
              {clickedClusters.at(-1)!.items_count}
            </div>
          </div>
        </div>
      )}

      <div
        className={`w-full overflow-auto`}
        style={{ height: clickedClusters.length === 0 ? '100%' : '85%' }}
      >
        {clickedClusters && clickedClusters.at(-1)?.type === 'Phrase' ? (
          <>
            {itemsDisplay({
              items: clickedClusters.at(-1)!.items ?? [],
            })}
          </>
        ) : (
          <ContainerDimensions>
            {({ height, width }) => (
              <Treemap
                clusters={currentClusters}
                height={height}
                width={width}
                nodeClicked={nodeClicked}
                bigColor={treemapBigColor}
                smallColor={treemapSmallColor}
                countFontSize={treemapCountFontSize}
                fontFamily={treemapFontFamily}
              />
            )}
          </ContainerDimensions>
        )}
      </div>
    </div>
  );
};
