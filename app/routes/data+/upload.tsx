import { type ActionFunctionArgs, json, type LoaderFunctionArgs} from '@remix-run/node';
import { useFetcher, useActionData } from '@remix-run/react';
import { useState, useRef } from 'react';
import { Button } from '#app/components/ui/button.tsx';
import { Icon } from '#app/components/ui/icon.tsx';
import { uploadFile } from '#app/routes/data+/upload.server.js';
import { requireUserId } from '#app/utils/auth.server.ts';

export async function loader({ request }: LoaderFunctionArgs) {
	// await requireUserId(request);
	return json({});
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const file = formData.get('file') as File | null;
	const model = formData.get('model') as string | null;

	if (!file) {
		return json({ error: 'No file uploaded' }, { status: 400 });
	}

	if (!model) {
		return json({ error: 'No model specified' }, { status: 400 });
	}

	const filename = file.name;
	const contentType = file.type;

	try {
		const result = await uploadFile(filename, contentType, file, model);
		return json({ status: result.status });
	} catch (error) {
		console.error('Upload error:', error);
		return json({ error: 'File upload failed' }, { status: 500 });
	}
}

export default function UploadRoute() {
	const fetcher = useFetcher<typeof action>();
	const actionData = useActionData<typeof action>();
	const [file, setFile] = useState<File | null>(null);
	const [model, setModel] = useState<string>('shift');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setModel(event.target.value);
	};

	return (
		<div className="mx-auto flex h-full max-w-lg flex-col justify-center gap-4 p-4">
			<h1 className="text-h1">Upload</h1>
			<fetcher.Form
				method="post"
				encType="multipart/form-data"
				className="flex flex-col gap-4"
			>
				<input
					ref={fileInputRef}
					type="file"
					name="file"
					className="hidden"
					onChange={event => {
						const selectedFile = event.target.files?.[0] || null;
						setFile(selectedFile);
					}}
				/>
				<select
					name="model"
					value={model}
					onChange={handleModelChange}
					className="w-full p-2 border border-gray-300 rounded text-background"
				>
					<option value="shift">Shift</option>
					<option value="player">Player</option>
					<option value="event">Event</option>
					<option value="edge">Edge</option>
				</select>
				<Button
					type="button"
					onClick={handleFileButtonClick}
					className="w-full"
				>
					<Icon name="file" />
					{file ? file.name : 'Select File'}
				</Button>
				<Button
					className="w-full"
					type="submit"
					disabled={!file}
					status={fetcher.state === 'submitting' ? 'pending' : 'idle'}
				>
					<Icon name="upload" />
					Upload
				</Button>
			</fetcher.Form>
			{actionData?.error && (
				<p className="text-red-500">{actionData.error}</p>
			)}
			{actionData?.status === 'success' && (
				<p className="text-green-500">File uploaded successfully!</p>
			)}
		</div>
	);
}