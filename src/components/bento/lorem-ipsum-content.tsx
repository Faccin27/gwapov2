import type React from "react"

interface LoremIpsumContentProps {
  isHovered: boolean // This prop is not used but kept for consistency
}

const LoremIpsumContent: React.FC<LoremIpsumContentProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 text-center text-muted-foreground">
      <p className="text-lg font-medium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
      <p className="mt-2 text-sm">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  )
}

export default LoremIpsumContent
