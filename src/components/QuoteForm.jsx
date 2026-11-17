import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

export const postcodeSchema = Yup.string()
  .trim()
  .required('Enter your postcode')
  .matches(UK_POSTCODE, 'Enter a valid UK postcode, like E1 6AN');

function buildSchema(withPostcode) {
  const shape = {
    name: Yup.string().trim().min(2, 'Enter your full name').required('Enter your full name'),
    phone: Yup.string()
      .trim()
      .required('Enter a phone number we can call')
      .test('uk-phone', 'Enter a UK phone number, like 020 8123 9988', (v) => {
        if (!v) return false;
        if (!/^\+?[\d\s()-]+$/.test(v)) return false;
        const digits = v.replace(/\D/g, '').length;
        return digits >= 10 && digits <= 13;
      }),
    issue: Yup.string()
      .trim()
      .min(10, 'Add a little more detail, at least 10 characters')
      .max(300, 'Keep it under 300 characters')
      .required("Tell us what's wrong"),
  };
  if (withPostcode) shape.postcode = postcodeSchema;
  return Yup.object(shape);
}

function Field({ id, label, placeholder, formik, as = 'input', type = 'text', autoComplete, inputMode }) {
  const error = formik.touched[id] && formik.errors[id];
  const Comp = as;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <Comp
        id={id}
        name={id}
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? 3 : undefined}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={formik.values[id]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full resize-none border-2 bg-white px-3.5 py-3 text-[15px] outline-none transition-all duration-200 placeholder:text-grey/60 ${
          error
            ? 'border-red-600'
            : 'border-[#E4E1D8] focus:-translate-x-0.5 focus:-translate-y-0.5 focus:border-ink focus:shadow-hard-sm'
        }`}
      />
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden text-sm font-medium text-red-700"
          >
            <span className="block pt-1.5">{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Success({ name, reference, onReset }) {
  const first = name.trim().split(' ')[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="py-6 text-center"
    >
      <svg viewBox="0 0 80 80" className="mx-auto h-20 w-20" aria-hidden="true">
        <motion.circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="#E8622C"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
        <motion.path
          d="M24 41l11 11 21-23"
          fill="none"
          stroke="#1B1F23"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, delay: 0.55, ease: 'easeOut' }}
        />
      </svg>
      <h3 className="mt-5 text-2xl font-black">Request received, {first}</h3>
      <p className="mx-auto mt-2 max-w-xs text-[15px] text-grey">
        An engineer will call you back with a flat-rate quote. Your reference is{' '}
        <span className="font-semibold text-ink">{reference}</span>.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 border-2 border-ink px-5 py-3 text-sm font-bold transition-colors hover:bg-ink hover:text-white"
      >
        Send another request
      </button>
    </motion.div>
  );
}

export default function QuoteForm({
  title = 'Request a free quote',
  button = 'Get my free quote',
  withPostcode = false,
  className = '',
  ...rest
}) {
  const [done, setDone] = useState(false);
  const [reference, setReference] = useState('');
  const controls = useAnimation();
  const shaken = useRef(0);
  const schema = useMemo(() => buildSchema(withPostcode), [withPostcode]);

  const formik = useFormik({
    initialValues: { name: '', phone: '', issue: '', ...(withPostcode ? { postcode: '' } : {}) },
    validationSchema: schema,
    onSubmit: async (_values, helpers) => {
      // Demo only: pretend to send, then show the success state.
      await new Promise((r) => setTimeout(r, 1700));
      setReference(`IC-${Math.floor(10000 + Math.random() * 89999)}`);
      setDone(true);
      helpers.setSubmitting(false);
    },
  });

  useEffect(() => {
    if (formik.submitCount > shaken.current && Object.keys(formik.errors).length > 0) {
      shaken.current = formik.submitCount;
      controls.start({ x: [0, -9, 9, -6, 6, 0], transition: { duration: 0.4 } });
    }
  }, [formik.submitCount, formik.errors, controls]);

  const reset = () => {
    formik.resetForm();
    shaken.current = 0;
    setDone(false);
  };

  return (
    <motion.div
      animate={controls}
      className={`border-2 border-ink bg-white p-7 text-ink shadow-hard-orange md:p-9 ${className}`}
      {...rest}
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <Success key="done" name={formik.values.name} reference={reference} onReset={reset} />
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <h3 className="mb-5 text-xl font-black">{title}</h3>
            <Field id="name" label="Full name" placeholder="Jane Smith" autoComplete="name" formik={formik} />
            <Field
              id="phone"
              label="Phone number"
              type="tel"
              placeholder="020 8123 9988"
              autoComplete="tel"
              inputMode="tel"
              formik={formik}
            />
            {withPostcode && (
              <Field id="postcode" label="Postcode" placeholder="E1 6AN" autoComplete="postal-code" formik={formik} />
            )}
            <Field
              id="issue"
              label="What's the issue?"
              as="textarea"
              placeholder="Boiler is on but no hot water"
              formik={formik}
            />
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="relative mt-1 w-full overflow-hidden bg-ink py-4 text-center font-bold text-white transition-colors hover:bg-orange disabled:cursor-wait disabled:hover:bg-ink"
            >
              {formik.isSubmitting && (
                <motion.span
                  className="absolute inset-y-0 left-0 bg-orange"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                />
              )}
              <span className="relative">{formik.isSubmitting ? 'Sending your request' : button}</span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
