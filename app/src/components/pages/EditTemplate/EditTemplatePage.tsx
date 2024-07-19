import { useSuspenseQuery } from "@tanstack/react-query"
import { getTemplateQueryOptions } from "../../../queries/template-query"
import { useNavigate, useParams } from "@tanstack/react-router"
import { EditTemplateForm } from "@app/components/organisms/EditTemplateForm";
import { TimeSlotForm } from "@app/components/organisms/TimeSlotForm";
import { Fragment } from "react/jsx-runtime";

export const EditTemplatePage = () => {
  const { templateId } = useParams({ strict: false });
  const { data: template } = useSuspenseQuery(getTemplateQueryOptions(parseInt(templateId!)));
  const navigate = useNavigate({ from: '/new-template' });

  const postSubmit = () => navigate({ to: '/' });

  return (
    <>
      <EditTemplateForm template={template} onSuccessfulSubmit={postSubmit} />
      {
        template.timeSlots.map((timeSlot => (
          <Fragment key={timeSlot.id}>
            <h2>{timeSlot.name}: {timeSlot.description}</h2>
            <TimeSlotForm timeSlot={timeSlot} onSuccessfulSubmit={async () => { }} />
          </Fragment>
        )))
      }
    </>
  )
}

