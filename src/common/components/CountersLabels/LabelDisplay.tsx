import React from 'react';
import { CountersConfigurations } from '../../types/customizeBarTypes';
import { getMetadataKeyValueConfiguration } from '../../utils/countersUtils';

export default function LabelDisplay({
  metadataKey,
  value,
  countersConfiguration,
  labelClicked,
  tooltip = '',
  width,
  maxWidth = '10ch',
  color = 'white',
}: {
  metadataKey: string;
  value: string;
  countersConfiguration: CountersConfigurations;
  labelClicked: (key: string, value: string) => void;
  tooltip?: string;
  width?: string;
  maxWidth?: string;
  color?: string;
}) {
  const config = getMetadataKeyValueConfiguration(
    { key: metadataKey, value: value },
    countersConfiguration
  );

  return (
    <span
      data-for="global"
      data-tip={tooltip}
      className="flex items-center px-1 cursor-pointer hover:text-gray-300"
      style={{ color }}
      onClick={() => labelClicked(metadataKey, value)}
    >
      {config && config.display && config.display.icon !== null && (
        <span className="w-[1em] h-[1em]">{config.display.icon}</span>
      )}
      <span
        style={{
          width,
          maxWidth,
          marginLeft: metadataKey === 'topic' ? '-1px' : '1px',
        }}
        className="italic truncate pr-1"
      >
        {value}
      </span>
    </span>
  );
}
