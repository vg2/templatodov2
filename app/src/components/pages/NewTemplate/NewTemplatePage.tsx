import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "@tanstack/react-router"
import { format, parse } from "date-fns"
import { DateFormat } from "@app/common/DateFormat"
import { newTemplateSchema } from "./new-template.schema"
import { useInsertNewTemplateMutation } from "../../../queries/insert-new-template-mutation"
import { H2 } from "@/components/atoms/Typography"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/atoms/Form"
import { Input } from "@/components/atoms/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/Select"
import { Button } from "@/components/atoms/Button"

import type { TemplateFormType } from "@app/model/Template.type"
import { Separator } from "@/components/atoms/Separator"

export const NewTemplatePage = () => {
    const navigate = useNavigate({ from: "/new-template" })
    const { mutateAsync: insertNewTemplate } = useInsertNewTemplateMutation()

    const form = useForm<TemplateFormType>({
        resolver: zodResolver(newTemplateSchema),
        defaultValues: {
            cycleLength: 1,
            description: "",
            frequency: "Daily",
            name: "",
            startDate: new Date(),
        },
    })

    const onSubmit = async (data: TemplateFormType) => {
        await insertNewTemplate(data)
        navigate({ to: "/" })
    }

    return (
        <>
            <H2 className="border-transparent">New template</H2>
            <Separator className="my-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Template name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Template name" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Description" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="cycleLength"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Cycle Length</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Cycle Length"
                                            {...field}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Frequency</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select frequency" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Daily">Daily</SelectItem>
                                            <SelectItem value="Weekly">Weekly</SelectItem>
                                            <SelectItem value="Monthly">Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start date</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        value={format(field.value, DateFormat)}
                                        onChange={(e) =>
                                            field.onChange(parse(e.target.value, DateFormat, new Date()))
                                        }
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}
