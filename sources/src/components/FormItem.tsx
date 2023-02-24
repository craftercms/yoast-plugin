import React from 'react';
import AccordionItem from "./AccordionItem";
import SeoForm from "./SeoForm";
import Box from "@mui/material/Box";
import AdvancedForm from "./AdvancedForm";

function getStyles() {
  return {
    form: {
      '& .MuiTextField-root': { marginBottom: '20px'},
      '& .MuiFormControlLabel-root': { width: '100%' }
    }
  }
}

// TODO
export interface FormProps {
  title: string,
  parentModelId: string;
  seoModel: any;
  setSeoModel: any;
  component: 'seo' | 'advanced';
}

export default function FormItem(props: FormProps) {
  const { title, parentModelId, seoModel, setSeoModel, component } = props;
  const sx = getStyles();

  const getValueFromTarget = (target: HTMLInputElement) => {
    if (target.type === '') {
      return target.value;
    } else if (target.type === 'checkbox') {
      return target.checked;
    }
    return target.value;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, propId: string) => {
    setSeoModel({
      ...seoModel,
      [propId]: getValueFromTarget(event.target)
    });
  };
  const updateField = (event: React.FocusEvent<HTMLInputElement>, fieldId: string) => {
    console.log('event', event);
    console.log('propId', fieldId);

    // @ts-ignore
    window.CrafterCMSNext?.system.getGuestToHostBus().next({
      type: 'UPDATE_FIELD_VALUE_OPERATION',
      payload: {
        modelId: seoModel.craftercms.id,
        parentModelId,
        fieldId,
        value: getValueFromTarget(event.target)
      }
    });
  };
  const Component = component === 'seo' ? SeoForm : AdvancedForm;

  return (
    <AccordionItem title={title}>
      <Box component="form" sx={sx.form}>
        <Component seoModel={seoModel} handleChange={handleChange} updateField={updateField} />
      </Box>
    </AccordionItem>
  );
}
