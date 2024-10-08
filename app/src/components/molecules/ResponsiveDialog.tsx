import { Button } from "@/components/atoms/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/atoms/Dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/atoms/Drawer"
import { useMediaQuery } from "@/hooks/useMediaQuery"


type ResponsiveDialogProps = {
    title: string,
    description: string
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ResponsiveDialog({ title, description, open, onOpenChange, children }: React.PropsWithChildren<ResponsiveDialogProps>) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px] bg-cararra-200">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="bg-cararra-200">
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-4">{children}</div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
