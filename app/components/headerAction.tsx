import Image from 'next/image';
import IconPlus from '../../public/plus.svg';
import IconSave from '../../public/save.svg';
import IconUndo from '../../public/undo.svg';
import React from 'react';

interface HeaderActionProps {
  setAddData: (data: boolean) => void;
  handleSubmit?: () => void;
}
const HeaderAction: React.FC<HeaderActionProps> = ({
  setAddData,
  handleSubmit,
}) => {
  return (
    <div className="flex justify-end w-full">
      <div className="flex gap-3 items-center">
        <div
          className="cursor-pointer"
          title="Add New Data"
          onClick={() => setAddData(true)}
        >
          <Image src={IconPlus} alt="Icon Plus" width={25} height={25} />
        </div>
        <div
          className="cursor-pointer"
          title="Save Data"
          onClick={handleSubmit}
        >
          <Image src={IconSave} alt="Icon Save" width={25} height={25} />
        </div>
        <div
          className="cursor-pointer"
          title="Cancel"
          onClick={() => setAddData(false)}
        >
          <Image src={IconUndo} alt="Icon Undo" width={25} height={25} />
        </div>
      </div>
    </div>
  );
};

export default HeaderAction;
