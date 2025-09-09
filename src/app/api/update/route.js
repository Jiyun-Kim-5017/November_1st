import { supabase } from '@/util/supabaseClient';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function PUT(request) {
    const body = await request.json();
    const { id, name, password, message } = body;

    if (!id || !name || !password || !message) {
        return NextResponse.json({ error: '모든 항목을 입력해 주세요.' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("Visitor's Message")
        .select('id, password')
        .eq('id', id)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: '해당 메시지를 찾을 수 없습니다.' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
        return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error: updateError } = await supabase
        .from("Visitor's Message")
        .update({
            name,
            password: hashedPassword,
            message,
        })
        .eq('id', id);

    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}