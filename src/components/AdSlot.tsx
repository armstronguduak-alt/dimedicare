interface AdSlotProps {
  slot: string;
  height?: string;
}

const AdSlot = ({ slot, height = "250px" }: AdSlotProps) => {
  // Hidden - ads are disabled
  return null;
};

export default AdSlot;