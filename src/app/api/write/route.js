import { supabase } from '@/util/supabaseClient';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json();
    const { name, password, message } = body;

    if (!name || !password || !message) {
        return NextResponse.json({ error: '모든 항목을 입력해주세요.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("Visitor's Message").insert({
        name,
        password: hashedPassword,
        message,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
