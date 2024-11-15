import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ModelService } from "@/types"

interface ServiceCardProps {
    className?: string;
    data?: ModelService;
}

const formSchema = z.object({
    name: z.string(),
    target: z.string(),
    type: z.number(),
    enableShowInService: z.boolean().default(false),
    duration: z.number().min(30),
})

const monitorTypes = {
    1: "HTTP GET (Certificate expiration and changes)",
    2: "ICMP Ping",
    3: "TCPing",
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ className, data }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name,
            target: data?.target,
            type: data?.type,
            enableShowInService: data?.enable_show_in_service,
            duration: data?.duration,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={`${className}`}>
                    <Plus /> Add New Service
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>New Service</DialogTitle>
                </DialogHeader>
                <div className="items-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Service Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="target"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Target</FormLabel>
                                        <FormControl>
                                            <Input type="link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={`${field.value}`}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select service type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.entries(monitorTypes).map(([k, v]) => (
                                                    <SelectItem value={k}>
                                                        {v}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
